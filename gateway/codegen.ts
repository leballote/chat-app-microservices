import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/schema.ts",
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../index#MyContext",
        mappers: {
          Chat: "../types/servicesRest#ChatModelSuccessResponse",
          Message: "../types/servicesRest#MessageModelSuccessResponse",
          User: "../types/servicesRest#UserModelSuccessResponse",
          ChatUser: "../types/servicesRest#ChatModelSuccessResponse",
          SignUpResponse: "../types/servicesRest#SignUpModelSuccessResponse",
          LogInResponse: "../types/servicesRest#LogInModelSuccessResponse",
        },
        // enumValues: {
        //   Status: "../types/apiResponse.types#Status",
        //   ChatType: "../types/apiResponse.types#ChatType",
        // },
      },
    },
  },
};

export default config;
