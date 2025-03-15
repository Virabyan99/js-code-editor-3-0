import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IconWithHover from './IconWithHover';
// In your setup file
import '@testing-library/jest-dom';


describe('IconWithHover', () => {
  it('renders with initial styles', () => {
    render(<IconWithHover />);
    const iconContainer = screen.getByRole('button', { name: /interactive icon/i });
    expect(iconContainer).toHaveClass('bg-gray-300');
    expect(iconContainer).toHaveClass('rounded-md');
  });

  it('applies hover effects', async () => {
    render(<IconWithHover />);
    const iconContainer = screen.getByRole('button', { name: /interactive icon/i });
    const icon = iconContainer.querySelector('svg');

    await userEvent.hover(iconContainer);
    expect(iconContainer).toHaveStyle('background-color: #000000');
    expect(icon).toHaveStyle('color: #ffffff');
  });
});
