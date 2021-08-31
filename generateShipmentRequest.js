const transactionType = ['Deposco', 'Not Deposco', 'Like Deposco']
const orderSource = ['ACME', 'Buy n Large', 'Monsters Inc', 'MomCorp']

const generateShipmentRequest = () => {
  return {
    "hub_id" : "0020002",
    "transaction_type" : transactionType[Math.floor(Math.random() * transactionType.length)],
    "deposco_order_id" : 1,
    "order_source" : orderSource[Math.floor(Math.random() * orderSource.length)],
    "special_instructions" : "shipping instructions from customer",
    "consignee_address" : {
      "address" : "123 Street",
      "address_2" : "",
      "address_3" : "",
      "city" : "City",
      "state" : "LA",
      "country" : "US",
      "zip" : "70808",
      "name" : "Name",
      "company_name" : "Company One",
      "phone" : "555-555-5555",
      "email" : "ex@example.com"
    },
    "return_address" : {
      "address" : "123 Main St",
      "address_2" : "",
      "address_3" : "",
      "city" : "City",
      "state" : "LA",
      "country" : "US",
      "zip" : "10001",
      "name" : "Name",
      "company_name" : "Company One",
      "phone" : "555-555-5555",
      "email" : "ex@example.com"
    },
    "package_details" : {
      "package_id" : Date.now().toString(36) + Math.random().toString(36).substring(2),
      "package_description" : "product description",
      "ship_via" : "DHL Parcel Ground",
      "container_type" : "BOX",
      "total_packages" : 1,
      "total_value" : Math.round(Math.random() * (100000 - 500) + 500),
      "currency" : "USD",
      "weight" : {
        "value" : 1.0,
        "unit" : "LB"
      },
      "dimensions" : {
        "length" : 16.0,
        "width" : 10.5,
        "height" : 1.0,
        "unit" : "IN"
      },
      "line_items" : [ {
        "line_item_id" : 1233,
        "sku" : "BAL-BLK-21MD",
        "ship_from" : "0020004",
        "packaged_quantity" : 1,
        "customs_details" : {
          "item_description" : "Turn It Up Pant",
          "country_of_origin" : "PT",
          "hs_code" : "6104.69",
          "packaged_quantity" : 1,
          "sku_number" : "BAL-BLK-21MD",
          "item_value" : 16500,
          "currency" : "USD"
        }
      } ]
    }
  }
}

module.exports = {generateShipmentRequest}