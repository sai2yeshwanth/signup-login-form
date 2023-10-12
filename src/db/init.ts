import User from "./models/Users"

const isDev = true
const dbInit = async() => {

await User.sync({alter:isDev})
}
export default dbInit