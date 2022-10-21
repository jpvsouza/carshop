export enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
  ObjectNotFound = 'ObjectNotFound',
}

// esse é o tipo do objeto vai ser usado para construir a resposta da API
type ErrorResponseObject = {
  message: string;
  httpStatus: number;
};

// aqui o tipo do catálogo
export type ErrorCatalog = Record<ErrorTypes, ErrorResponseObject>;

export const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    message: 'Entity not found',
    httpStatus: 404,
  },
  InvalidMongoId: {
    message: 'Id must have 24 hexadecimal characters',
    httpStatus: 400,
  },
  ObjectNotFound: {
    message: 'Object not found',
    httpStatus: 404,
  },
};
