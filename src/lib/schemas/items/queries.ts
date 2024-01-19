export const QUERY_USER_MERCHANT =
  `query userMerchant {
  userMerchant {
   merchant {
    id
    merchantType {
      id
      name
    }
    name
    description
    logoUrl
    address {
      id
      addressLine1
      addressLine2
      city
      county
      country
      postcode
    }
   }
  }
}`

export const QUERY_MERCHANT_PLACELIST =
  `query PlaceList($req: ReqPlaceList!) {
  placeList(req: $req) {
    places { 
    id
    name
    logoUrl
    }
  }
}`

export const QUERY_MENUS = `
  query Menus($req: ReqMenus!){
    menus(req: $req) {
      menus {
        id
        name
        position
        availableFromDate
        availableTillDate
        availableFromTime
        availableTillTime
        availableOnWeekdays
        categories {
          id
          name
          position
          isAvailable
        }
        menuItems { 
          id
          name
          description
          price
          bannerUrl
          isAvailable
          cookingTime
          cookingTimeUnit
          weight
          weightUnit
          optionSets {
            id
            name
            options {
              id
              name
              price
            }
          }
        }
        extras {
          id
          name
          price
          isAvailable
        }
      }
    }
  }`

export const QUERY_CATEGORIES =
  `query Categories($req: ReqCategoryList!){
    menuCategories(req: $req) {
     categories {
        id
        name
        position
      }
    }
  }`


export const ContentHostUrlQUERY = `
  query thisConfig{
    config {
      config {
        contentHostUrl
      }
    }
  }`

export const QUERY_MENU_ITEM = `
  query MenuItem($req: ReqMenuItemGet!){
    menuItem(req: $req) {
      item {
        id
        name
        description
        price
        bannerUrl
        isAvailable
        cookingTime
        cookingTimeUnit
        weight
        weightUnit
        extras {
          id
          name
          price
          isAvailable
        }
        optionSets {
          id
          name
          options {
            id
            name
            price
          }
        }
        tags {
          id
          name
        }
        categories {
          id
          name
          position
          isAvailable
        }
      }
    }
  }`