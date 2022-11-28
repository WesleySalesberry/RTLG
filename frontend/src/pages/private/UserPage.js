import { BaseLayout } from "../../component/Layouts/BaseLayout"
import { UserProfile } from "../../component/StudentProfile/UserProfile"

export const UserPage = () => {
  return (
    <BaseLayout>
      <UserProfile />
    </BaseLayout>
  )
}