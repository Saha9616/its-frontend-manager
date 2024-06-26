import { getUserProps } from "@/actions/getUserProps";
import { getUsers } from "@/actions/getUsers";
import DataTableContainer from "@/components/user-management/DataTableContainer";

export default async function UserManagementView() {
  const user = await getUserProps({
    includeSchool: true,
    includeCourses: false,
    includeSubmissions: false,
  });
  const users = await getUsers(user).then((users) => (users ? users : []));
  return (
    <>
      <h1 className="text-xl font-semibold mb-2">User Management</h1>
      <DataTableContainer name={user.school.name} users={users}></DataTableContainer>
    </>
  );
}
