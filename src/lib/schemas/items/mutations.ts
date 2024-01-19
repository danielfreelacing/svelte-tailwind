export const CreateMenuMutation =
  `mutation CreateMenu($req: ReqMenuCreate!) {
    menuCreate(req: $req){
      menu {
        id
      }
    }
  }`

export const UpdateMenuMutation = 
  `mutation UpdateMenu($req: ReqMenuUpdate!) {
    menuUpdate(req: $req){
      menu {
        id
      }
    }
  }`

export const DeleteMenuMutation = 
  `mutation UpdateMenu($req: ReqMenuDelete!) {
    menuDelete(req: $req){
      isSuccess
    }
  }`

export const CreateCategoryMutation =
  `mutation CreateCategory($req: ReqCategoryCreate!) {
    categoryCreate(req: $req){
      category {
        id
      }
    }
  }`

export const UpdateCategoryMutation =
  `mutation UpdateCategory($req: ReqCategoryUpdate!) {
    categoryUpdate(req: $req){
      category {
        id
      }
    }
  }`

export const DeleteCategoryMutation =
  `mutation DeleteCategory($req: ReqCategoryDelete!) {
    categoryDelete(req: $req){
      isSuccess
    }
  }`

export const CreateMenuItemMutation =
  `mutation CreateMenuItem($req: ReqMenuItemCreate!) {
    menuItemCreate(req: $req){
      item {
        id
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
        categories {
          id
          name
          position
          isAvailable
        }
      }
    }
  }`

export const UpdateMenuItemMutation =
  `mutation UpdateMenuItem($req: ReqMenuItemUpdate!) {
    menuItemUpdate(req: $req){
      item {
        id
      }
    }
  }`

export const DeleteMenuItemMutation =
  `mutation DeleteMenuItem($req: ReqMenuItemDelete!) {
    menuItemDelete(req: $req){
      isSuccess
    }
  }`

export const CreateMenuExtraMutation =
  `mutation CreateMenuExtra($req: RespMenuExtraCreate!) {
    menuExtraCreate(req: $req){
      menuExtra {
        id
      }
    }
  }`

export const UpdateMenuExtraMutation =
  `mutation UpdateMenuExtra($req: ReqMenuExtraUpdate!) {
    menuExtraUpdate(req: $req){
      menuExtra {
        id
      }
    }
  }`

export const DeleteMenuExtraMutation =
  `mutation CreateMenuExtra($req: RespMenuExtraDelete!) {
    menuExtraCreate(req: $req){
      isSuccess
    }
  }`
