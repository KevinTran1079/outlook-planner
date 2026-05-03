import { render, screen } from '@testing-library/react';

import { App } from './App';

describe('App', () => {
  it('renders the planning workspace regions', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: 'Retirement workspace' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Assumptions' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Projection' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Accounts' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Canada rules' }),
    ).toBeInTheDocument();
    expect(screen.getByText('CA-2026.1')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /import/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /export/i })).toBeInTheDocument();
  });

  it('shows validation and privacy status', () => {
    render(<App />);

    expect(
      screen.getByText('Plan document parsed with schema validation.'),
    ).toBeInTheDocument();
    expect(screen.getByText('No server sync.')).toBeInTheDocument();
    expect(
      screen.getByText('Import and export use local JSON files.'),
    ).toBeInTheDocument();
  });
});
