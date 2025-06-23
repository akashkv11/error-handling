async function errorHandler<T>(
  promise: Promise<T>
): Promise<[undefined, T] | [Error, undefined]> {
  return promise
    .then((result) => {
      return [undefined, result] as [undefined, T];
    })
    .catch((error) => {
      return [error, undefined];
    });
}
async function typedErrorHandler<T, E extends new (message?: string) => Error>(
  promise: Promise<T>,
  errorTypes?: E[]
): Promise<[InstanceType<E>, undefined] | [undefined, T]> {
  return promise
    .then((result) => {
      return [undefined, result] as [undefined, T];
    })
    .catch((error) => {
      if (errorTypes === undefined) {
        return [error, undefined];
      }
      if (errorTypes && errorTypes.some((type) => error instanceof type)) {
        return [error as InstanceType<E>, undefined];
      }
      throw error;
    });
}
