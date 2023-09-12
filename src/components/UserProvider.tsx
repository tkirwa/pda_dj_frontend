import React, { createContext, useContext, useState } from 'react';

// // Define the shape of the user object
// interface User {
//   username: string;
//   // Add other user-related fields here if needed
// }

// // Define the context type
// interface UserContextType {
//   user: User;
//   setUser: React.Dispatch<React.SetStateAction<User>>;
// }

// // Create the UserContext
// const UserContext = createContext<UserContextType | undefined>(undefined);

// // Define a custom hook to access the context
// export function useUser() {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// }

// // Create the UserProvider component
// export const UserProvider: React.FC = ({ children }) => {
//   const [user, setUser] = useState<User>({ username: '' });

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
