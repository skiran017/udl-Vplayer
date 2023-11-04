export const contractTransactionsWithPageInfo = `query($count: Int $cursor: String){
  transactions(
    after: $cursor
    first: $count
    tags: [{ name: "Contract", values: ["IL5nfhl96Tvhxq0GpV7opSbX88T2l5eFJDaNudORbDs"] }]
  ) {
    pageInfo {
      hasNextPage
    }
    edges{
      cursor
      node {
        id
        owner {
          address
        }
        data {
          size
        }
        block {
          height
          timestamp
        }
        tags {
          name,
          value
        }
      }
    }
  }
}`

export const getTags = (id: string) => `query getTags {
    transactions(
      ids: ["${id}"]) {
      edges {
        node {
          tags {
            name
            value
          }
        }
      }
    }
  }`

export const getVPlayerTransactions = `query($count: Int, $name: String, $values: [String!], $match: TagMatch){
    transactions(
      tags: [
        {name: $name, values: $values, match: $match}
      ]
      first: $count
    ) {
      edges{
        cursor
        node {
          id
          owner {
            address
          }
          data {
            size
          }
          block {
            height
            timestamp
          }
          tags {
            name,
            value
          }
        }
      }
    }
  }`
