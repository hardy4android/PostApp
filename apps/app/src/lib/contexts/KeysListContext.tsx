// // import { IGetAllKeysResponseData } from '@/apis/user';
// import useAllKeys from '@/apis/user/useAllKeys';
// import { KeysListRef } from '@/app/dashboard/_components/KeysList';
// import React, { createContext, useContext, useRef, useState } from 'react';

// interface KeysListContextType {
//   keysListRef: React.RefObject<KeysListRef>;
//   queryAllKeys: ReturnType<typeof useAllKeys>;
//   keys: IGetAllKeysResponseData['keys'] | undefined;
//   filteredKeys: IGetAllKeysResponseData['keys'] | undefined;
//   setFilteredKeys: React.Dispatch<
//     React.SetStateAction<IGetAllKeysResponseData['keys'] | undefined>
//   >;
//   currentReservation: {
//     id: string;
//     name: string;
//     primaryImage: string;
//   } | null;
//   setCurrentReservation: React.Dispatch<
//     React.SetStateAction<{
//       id: string;
//       name: string;
//       primaryImage: string;
//     } | null>
//   >;
// }

// const KeysListContext = createContext<KeysListContextType | null>(null);

// export function KeysListProvider({ children }: { children: React.ReactNode }) {
//   const keysListRef = useRef<KeysListRef>(null) as React.RefObject<KeysListRef>;
//   const queryAllKeys = useAllKeys();
//   const keys = queryAllKeys.data?.keys;
//   const [filteredKeys, setFilteredKeys] =
//     useState<IGetAllKeysResponseData['keys']>();
//   const [currentReservation, setCurrentReservation] = useState<{
//     id: string;
//     name: string;
//     primaryImage: string;
//   } | null>(null);

//   return (
//     <KeysListContext.Provider
//       value={{
//         keysListRef,
//         queryAllKeys,
//         keys,
//         filteredKeys,
//         setFilteredKeys,
//         currentReservation,
//         setCurrentReservation,
//       }}
//     >
//       {children}
//     </KeysListContext.Provider>
//   );
// }

// export function useKeysList() {
//   const context = useContext(KeysListContext);
//   if (!context) {
//     throw new Error('useKeysList must be used within a KeysListProvider');
//   }
//   return context;
// }
