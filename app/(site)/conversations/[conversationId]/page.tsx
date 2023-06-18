import React from 'react';

const page = async ({params}: {params: {conversationId: string}}) => {
  return (
    <div>
      conversationid: {params.conversationId}
    </div>
  );
};

export default page;