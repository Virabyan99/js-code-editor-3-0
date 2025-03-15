import { render, screen } from '@testing-library/react';
import ResizablePanels from './ResizablePanels';
import { useMotionValue } from 'framer-motion';

// Mock Framer Motion to control motion values
vi.mock('framer-motion', async () => {
    const actual = await vi.importActual('framer-motion');
    return {
      ...actual,
      useMotionValue: vi.fn(() => ({ get: () => 0 })),
      useTransform: vi.fn((mv: { get: () => number }, transform: (value: number) => any) => transform(mv.get())),
    };
  });
  

describe('ResizablePanels', () => {
  it('renders left and right panels with icons', () => {
    render(<ResizablePanels />);
    expect(screen.getByText('Left Panel')).toBeInTheDocument();
    expect(screen.getByText('Right Panel')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /interactive icon/i })).toHaveLength(8);
  });

  it('renders divider with accessibility attributes', () => {
    render(<ResizablePanels />);
    const divider = screen.getByRole('separator', { name: /resize panels/i });
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass('hidden', { exact: false }); // Hidden on mobile
  });
});
