import React, { ReactNode } from 'react';

const UsersLayout = async ({
  children
}: {
  children: ReactNode
}) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default UsersLayout;