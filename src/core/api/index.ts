export enum DataType {
  JSON,
  BLOB,
  FORM_DATA,
}
async function api(
  method: string,
  url: string,
  data: unknown,
  headers = {},
  dataType = DataType.JSON
): Promise<unknown> {
  const fullHeaders =
    dataType === DataType.JSON
      ? {
          ...headers,
          'X-Device-Type': 'NORMAL',
          'Content-Type': 'application/json',
        }
      : {
          ...headers,
          'X-Device-Type': 'NORMAL',
        };
  const res = await fetch(url, {
    method,
    headers: fullHeaders,
    body: dataType === DataType.JSON && data !== null ? JSON.stringify(data) : (data as BodyInit | null),
  });
  if (!res.ok) {
    return { ...res, errorMessage: res.statusText || 'Error' };
  }
  if (dataType === DataType.BLOB) {
    return res;
  }
  const promise = res.json();
  return promise.then(
    (fulfilled) => {
      if (fulfilled.successful) {
        return fulfilled;
      }
      return { ...fulfilled, errorMessage: fulfilled.errorDetail || 'Error' };
    },
    (rejected) => {
      return { ...rejected, errorMessage: rejected.errorDetail || 'Error' };
    }
  );
}
export async function getRequest(url: string, headers = {}, dataType?: DataType): Promise<unknown> {
  return api('get', url, null, headers, dataType);
}
export async function postRequest(
  url: string,
  data: unknown = {},
  headers = {},
  dataType?: DataType
): Promise<unknown> {
  return api('post', url, data, headers, dataType);
}
export async function putRequest(url: string, data: unknown = {}, headers = {}, dataType?: DataType): Promise<unknown> {
  return api('put', url, data, headers, dataType);
}
export async function removeRequest(url: string, headers = {}, dataType?: DataType): Promise<unknown> {
  return api('delete', url, null, headers, dataType);
}
export async function downloadRequest(url: string, data: unknown = {}, headers = {}): Promise<unknown> {
  return api('post', url, data, headers, DataType.BLOB);
}
