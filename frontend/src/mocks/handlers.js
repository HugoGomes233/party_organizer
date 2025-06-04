import { http, HttpResponse } from 'msw';
import { Events } from './data';

export const handlers = [
  http.get('/api/eventos', () => {
    return HttpResponse.json(Events);
  }),
];
