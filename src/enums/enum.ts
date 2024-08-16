export enum MESSSGE {
  SERVER_ERROR = "server error , try again later",
  WELCOME = "Welcome {name} 🖐️ ",
  INCORRECT_INFO = "Please insert correct Info",
  EXSITED_USER = "There is an account with this email",
  USER_NOT_FOUND = "Can Not Find User",
  SUCCSESS = "succsess",
  EXISTED_USER_NAME = "This username already taken",
  INCORRECT_PASSWORD = "Your Password Is Wrong ! 🚫",
  CREATE_ACCOUNT = "Please create account first",
  INCORRECT_USERNAME_PASSWORD = "userName or password is incorrect",
  PASS_CHANGE = "Password changed successfully",
  DUPLICATE_INFORMATION = "You have not made any changes",
}

export enum STATUS {
  ERROR = 500,
  SUCCSESS = 200,
  INCORRECT_INFO = 422,
  EXSITED_USER = 409,
  EXSITED_INFO = 409,
  EDIT_INFO = 201,
  NOT_FOUND = 404,
}
