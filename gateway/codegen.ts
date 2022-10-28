import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../index#MyContext",
        mappers: {
          Chat: "../types/apiResponse.types#ChatModelResponse",
          Message: "../types/apiResponse.types#MessageModelResponse",
          User: "../types/apiResponse.types#UserModelResponse",
          SignUpResponse: "../types/apiResponse.types#SignUpModelResponse",
          LogInResponse: "../types/apiResponse.types#LogInModelResponse",
        },
        enumValues: {
          Status: "../types/apiResponse.types#Status",
          ChatType: "../types/apiResponse.types#ChatType",
        },
      },
    },
  },
};

export default config;
