export const TBody = ({ user, idx }) => {
  return (
    <tr className="text-center">
      <th scope="row">{idx}</th>
      <td>{ user.name }</td>
      <td>{user.email}</td>
      <td>{ user.role }</td>
      <td>{ user.createdAt }</td>
    </tr>
  )
}