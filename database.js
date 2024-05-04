let Database = [
  {
    id: 1,
    name: "Cindy Doe",
    email: "cindy123@gmail.com",
    password: "test",
    role: "admin",
    reminders: [
      {
        id: 1,
        title: "Grocery shopping",
        description: "Buy milk and bread from safeway",
        completed: false,
      },
      {
        id: 2,
        title: "Grocery shopping2",
        description: "Buy milk and bread from safeway",
        completed: false,
      },
      {
        id: 3,
        title: "Grocery shopping3",
        description: "Buy milk and bread from safeway",
        completed: false,
      },
    ]
  },
  {
    id: 2,
    name: "Jimmy Doe",
    email: "jimmy123@gmail.com",
    password: "test",
    role: "regular",
    reminders: [
      {
        id: 1,
        title: "Car shopping",
        description: "Buy a Honda Civic",
        completed: false,
      },
    ],
  },
  {
    id: 3,
    name: "Can Doe",
    email: "can123@gmail.com",
    password: "test",
    role: "regular",
    reminders: [
      {
        id: 1,
        title: "Car shopping",
        description: "Buy a Honda Civic",
        completed: false,
      },
    ],
  }
];

let Chat = [
  {
    id: [1,2],
    messages:[
      {
        id: 1,
        date: "2024-02-03",
        message: "Hello, how are you?"
      },
      {
        id: 2,
        date: "2021-09-01",
        message: "I am good, how about you?"
      },
      {
        id: 1,
        date: "2024-03-05",
        message: "Hahahahahah"
      },
      {
        id: 2,
        date: "2024-03-05",
        message: "Cheuwsday init"
      }
    ]
  },
  {
    id: [1,3],
    messages:[
      {
        id: 1,
        date: "2024-02-03",
        message: "Hello, how are you?"
      },
      {
        id: 3,
        date: "2021-09-01",
        message: "I am good, how about you?"
      },
      {
        id: 1,
        date: "2024-03-05",
        message: "Hahahahahah"
      },
      {
        id: 3,
        date: "2024-03-05",
        message: "Cheuwsday init"
      }
    ]
  }
];

const userModel = {
  findOne: (email) => {
    const user = Database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = Database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  findOrCreate: (githubProfile, callback) => {
    const user = Database.find((user) => user.id === `${githubProfile.username}#${githubProfile.id}`);
    // console.log("User, pre-processing: ", user)
    // console.log("githubProfile, pre-processing: ", githubProfile)
    if (user) {
      callback(null, user);
    } else {
      const githubUser =
          {
            id: `${githubProfile.username}#${githubProfile.id}`,
            name: githubProfile.username,
            email: githubProfile._json.email,
            password: null,
            role: 'user',
            reminders: []
          };
      Database.push(githubUser);
      // console.log("Database: ",database)
      callback(null, githubUser);
    }
  }
};

module.exports = { Database, Chat, userModel };
