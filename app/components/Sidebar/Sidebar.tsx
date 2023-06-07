import { ReactNode } from "react";

async function Sidebar({children}:
  {children: ReactNode}
  ) {
  return (
    <div>
      {children}
    </div>
  )
}

export default Sidebar