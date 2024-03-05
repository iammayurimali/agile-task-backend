const {gql} = require("apollo-server-express")

const typeDefs = gql`
  type TaskHour {
    id: ID!
    date: String!
    day: String!
    hours: Float!
  }

type ProjectTaskHours{
    assignProjectId: ID!
    taskHours: [TaskHour!]!
}
type AddTaskHours{
    id:ID!
    date: String!
    day: String!
    hours: Float!
    comments: String!
    totalWeekHours: String

}
type AssignProject{
    id:ID
    projectName: String
    addTaskHours:[AddTaskHours!]!
}
type User{
    id: ID
    firstname:String
    lastname: String
    email: String
    password: String
    accountType: String
    approved: Boolean
    token: String
    assignProject:[AssignProject]
}
type Query{
    hello: String,
    getUser: [User]
    getAllDevelopers: [User]
    getUserByID(id: ID!): User
    getAssignedProject(id: ID!): [AssignProject]
}
input UserInput{
    firstname:String
    lastname: String
    email: String
    password: String
    confirmPassword: String
    accountType: String
}

input LoginData{
    email: String
    password: String
    accountType:String

}

input AssignProjectDetails{
    developerId: ID!
    assignedproject: String
   
}

 input taskHoursData{
     day: String!
     date: String!
     hours: Float!
 }

input hoursTask{
    day: String!
    date: String!
    hours: Float!
}
input idHours{
    assignProjectId: ID!
    hoursTaskData: [hoursTask]!
}
input TaskHoursDetails{
    userId: ID!
    assignProjectId: ID!
    day: String!
    date: String!
    hours: Float!
    comments: String!
}

input DeleteData{
    assignProjectId: ID!
    day: String!
    date: String!
    hours: Float!
    comments: String!
}


type Mutation{
    signup(userData: UserInput!): User
    login(loginData: LoginData!) : User
    assignProject(assignproject: AssignProjectDetails) : AssignProject
    addTaskHours(taskHoursData: TaskHoursDetails!) : AddTaskHours
    editAddedTask(updateTaskData: TaskHoursDetails) : AddTaskHours
    deleteTaskData(deletedata: DeleteData) : AddTaskHours
 }

`;

module.exports = typeDefs