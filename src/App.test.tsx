import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';
import { EVENT_CONFIG } from './config/event';

/**
 * Tests de navegación principal: cubren el flujo completo de las 5 pantallas
 * y los criterios de aceptación clave (empezar en <=2 interacciones, revelar
 * respuesta, otro reto sin recargar, nuevo participante limpia el estado).
 */
describe('Flujo de navegación de Dev Challenge Express', () => {
  it('muestra la Home con el tagline y el botón de inicio', () => {
    render(<App />);
    expect(screen.getByText(/Dev Challenge/i)).toBeInTheDocument();
    expect(
      screen.getByText(/1 reto\. 30 segundos\. ¿Te animas\?/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /aceptar el reto/i }),
    ).toBeInTheDocument();
  });

  it('permite iniciar un reto en 2 interacciones (aceptar + elegir categoría)', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Interacción 1: aceptar el reto.
    await user.click(screen.getByRole('button', { name: /aceptar el reto/i }));
    expect(
      screen.getByRole('main', { name: /selección de categoría/i }),
    ).toBeInTheDocument();

    // Interacción 2: elegir una categoría.
    await user.click(screen.getByRole('button', { name: /categoría cloud/i }));

    // Estamos en la pantalla de reto, con temporizador visible.
    expect(screen.getByRole('main', { name: /^reto$/i })).toBeInTheDocument();
    expect(screen.getByRole('timer')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /ver respuesta/i }),
    ).toBeInTheDocument();
  });

  it('"Sorpréndeme" lleva directamente a un reto', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /aceptar el reto/i }));
    await user.click(screen.getByRole('button', { name: /sorpréndeme/i }));
    expect(screen.getByRole('main', { name: /^reto$/i })).toBeInTheDocument();
  });

  it('revela la respuesta y permite pedir otro reto sin recargar', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /aceptar el reto/i }));
    await user.click(screen.getByRole('button', { name: /categoría devops/i }));

    await user.click(screen.getByRole('button', { name: /ver respuesta/i }));
    expect(
      screen.getByRole('main', { name: /respuesta/i }),
    ).toBeInTheDocument();

    // Otro reto: vuelve a la pantalla de reto.
    await user.click(screen.getByRole('button', { name: /otro reto/i }));
    expect(screen.getByRole('main', { name: /^reto$/i })).toBeInTheDocument();
  });

  it('permite cambiar de categoría desde la respuesta', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /aceptar el reto/i }));
    await user.click(screen.getByRole('button', { name: /categoría code/i }));
    await user.click(screen.getByRole('button', { name: /ver respuesta/i }));
    await user.click(
      screen.getByRole('button', { name: /cambiar categoría/i }),
    );
    expect(
      screen.getByRole('main', { name: /selección de categoría/i }),
    ).toBeInTheDocument();
  });

  it('finaliza y el botón "Nuevo participante" limpia el estado y vuelve al Home', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /aceptar el reto/i }));
    await user.click(screen.getByRole('button', { name: /categoría security/i }));
    await user.click(screen.getByRole('button', { name: /ver respuesta/i }));
    await user.click(screen.getByRole('button', { name: /finalizar/i }));

    // Pantalla final.
    expect(screen.getByText(/Challenge completed/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        new RegExp(`Gracias por jugar con ${EVENT_CONFIG.communityName}`, 'i'),
      ),
    ).toBeInTheDocument();

    // Nuevo participante: vuelve al Home limpio.
    await user.click(
      screen.getByRole('button', { name: /nuevo participante/i }),
    );
    expect(
      screen.getByText(/1 reto\. 30 segundos\. ¿Te animas\?/i),
    ).toBeInTheDocument();
  });

  it('el contador de sesión incrementa al completar retos', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /aceptar el reto/i }));
    await user.click(screen.getByRole('button', { name: /categoría genai/i }));
    await user.click(screen.getByRole('button', { name: /ver respuesta/i }));

    // Tras completar 1 reto, el badge muestra "Retos completados: 1".
    expect(
      screen.getByLabelText(/retos completados: 1/i),
    ).toBeInTheDocument();
  });

  it('permite seleccionar una opción y la marca como elegida (aria-pressed)', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /aceptar el reto/i }));
    await user.click(screen.getByRole('button', { name: /categoría code/i }));

    // Buscamos un reto con opciones (A/B/...). Si el actual no tiene,
    // pedimos otro reto hasta encontrarlo (acotado).
    let optionButton: HTMLElement | null = null;
    for (let attempt = 0; attempt < 12; attempt++) {
      // Las opciones tienen una letra-clave A, B, C... como primer hijo.
      const candidates = screen
        .queryAllByRole('button')
        .filter((btn) => /^[A-D]\S/.test(btn.textContent ?? ''));
      if (candidates.length > 0) {
        optionButton = candidates[0];
        break;
      }
      // Reto sin opciones (abierto): avanzar con Ver respuesta -> Otro reto.
      await user.click(screen.getByRole('button', { name: /ver respuesta/i }));
      await user.click(screen.getByRole('button', { name: /otro reto/i }));
    }

    expect(optionButton).not.toBeNull();
    expect(optionButton).toHaveAttribute('aria-pressed', 'false');
    await user.click(optionButton!);
    expect(optionButton!).toHaveAttribute('aria-pressed', 'true');
  });
});
