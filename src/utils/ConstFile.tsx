export const ConstValue ={
    UserName:/^[a-zA-Z][a-zA-Z0-9_-]{0,15}$/,
    EmailRegex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,16})+$/,
    NameRegex : /^[A-Za-z\s]+$/,
    PasswordRegex : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/,
    Admin:"kpbagresa4113@yopmail.com"
}
export const Option = [
    {
        value: "Men",
        label: "Men",
      },
      {
        value: "Women",
        label: "Women",
      },
      {
        value: "Kid",
        label: "Kid",
      },
]