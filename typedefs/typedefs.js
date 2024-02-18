const {gql} = require("apollo-server-express")

const typeDefs = gql`
  type TaskHour {
    id: ID
    date: String!
    hours: Float!
  }
type AddTaskHours{
    id:ID
    assignProjectId:AssignProject!
    taskHours: [TaskHour!]
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
input TaskHourInput{
    hours: Float!
}
input TaskHoursDetails{
    userId: ID!
    assignProjectID: ID
    taskHours: [TaskHourInput]!
}

input EditTaskDeatils{
    projectID:ID!,
    taskId: ID!,
    taskhour: [TaskHourInput]!
}

type Mutation{
    signup(userData: UserInput!): User
    login(loginData: LoginData!) : User
    assignProject(assignproject: AssignProjectDetails) : AssignProject
    addTaskHours(taskHour: TaskHoursDetails) : AddTaskHours
    editAddedTask(editTask: EditTaskDeatils) : AddTaskHours
}
`;

module.exports = typeDefs