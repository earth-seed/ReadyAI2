import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BannerStandalone from './BannerStandalone';

describe('BannerStandalone', () => {
  it('renders the AI operating layer tagline', () => {
    render(<BannerStandalone />);
    expect(screen.getByText(/AI operating layer/i)).toBeInTheDocument();
  });
});
