import { render, screen } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar component', () => {
  const label = 'test-label';
  const onLocationClick = jest.fn();
  const locationName = 'Otakaari';

  test('renders properly', () => {
    const { getByTestId } = render(<SearchBar locationName={locationName} />);
    expect(getByTestId('searchbar')).toBeInTheDocument();
  });

  test('renders label properly', () => {
    const { getAllByText } = render(
      <SearchBar label={label} locationName={locationName} />
    );
    expect(getAllByText(label).length).toBeTruthy();
  });
});
