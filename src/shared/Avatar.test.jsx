import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Avatar from './Avatar';

describe('Avatar', () => {
  it('renders an image with alt text and class names', () => {
    render(<Avatar className="rounded-full" alt="User avatar" />);

    const avatarImage = screen.getByAltText('User avatar');
    expect(avatarImage).toBeTruthy();
    expect(avatarImage.className).toContain('rounded-full');
    expect(avatarImage.getAttribute('src')).toBeTruthy();
  });
});
