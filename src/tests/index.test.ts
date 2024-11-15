import { processSearch, fetchTravelData, clearResult } from '../index';


describe('processSearch', () => {
  beforeAll(() => {
    global.alert = jest.fn();
  });

  it('should return "beaches" for "beach"', () => {
    const result = processSearch('beach');
    expect(result).toBe('beaches');
  });

  it('should return "temples" for "temple"', () => {
    const result = processSearch('temple');
    expect(result).toBe('temples');
  });

  it('should return "countries" for "country"', () => {
    const result = processSearch('country');
    expect(result).toBe('countries');
  });

  it('should return null for "mountain" and alert', () => {
    const result = processSearch('mountain');
    expect(result).toBeNull();
    expect(global.alert).toHaveBeenCalledWith('Please enter a correct destination');
  });
});


describe('fetchTravelData', () => {
    beforeEach(() => {
        document.body.innerHTML = `
          <div id="search-result"></div>
          <input id="search-bar" value="beaches" />
          <button id="search-button">Search</button>
        `;
      });

      it('should fetch data and update the result container for a valid query', async () => {
        const fakeJson = {
          beaches: [
            {
              id: 1,
              name: 'Beautiful Beach',
              imageUrl: 'http://example.com/beach.jpg',
              description: 'A very beautiful beach.'
            }
          ],
          temples: [],
          countries: []
        };

        global.fetch = jest.fn().mockResolvedValue({
          ok: true,
          json: async () => fakeJson,
        });

        await fetchTravelData();
        setTimeout(() => {
            const resultContainer = document.getElementById('search-result');
            expect(resultContainer?.innerHTML).toContain('Beautiful Beach');
            expect(resultContainer?.innerHTML).toContain('A very beautiful beach');
            expect(resultContainer?.innerHTML).toContain('http://example.com/beach.jpg');
          }, 0);
      });

      it('should handle an invalid fetch request', async () => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: false,
          json: async () => ({})
        });

        await fetchTravelData();
        const resultContainer = document.getElementById('search-result');
        expect(resultContainer?.innerHTML).toBe('');
      });
    });


describe('clearResult', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div id="search-result">
          <div class="recommendation-card">Test Content</div>
        </div>
      `;
    });

    it('should clear the content of the result container', () => {
      clearResult();
      const resultContainer = document.getElementById("search-result");
      expect(resultContainer?.innerHTML).toBe('');
    });

    it('should log an error if the result container is not found', () => {
      document.body.innerHTML = '';
      const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
      clearResult();
      expect(consoleErrorMock).toHaveBeenCalledWith('Result container is not present');
      consoleErrorMock.mockRestore();
    });
  });