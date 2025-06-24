declare module 'graphql-upload' {
  import { RequestHandler } from 'express';
  import { GraphQLScalarType } from 'graphql';

  export const graphqlUploadExpress: (options?: any) => RequestHandler;
  export const GraphQLUpload: GraphQLScalarType;
  export type FileUpload = {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: () => NodeJS.ReadableStream;
  };
} 