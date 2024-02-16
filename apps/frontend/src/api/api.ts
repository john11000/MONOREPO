
export function fetchData(key: RequestInfo | URL) {
    return fetch(key).then((res) => res.json());
  }
