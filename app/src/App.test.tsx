import { render, screen } from '@testing-library/react';

import { App } from './App';

describe('App', () => {
  it('renders the planning workspace shell', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: 'Retirement workspace' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Local-first')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /import/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /export/i })).toBeInTheDocument();
  });
});
