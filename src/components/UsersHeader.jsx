function UsersHeader({ inputValue, onInputChange }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">Users</h1>

      <input
        type="text"
        placeholder="Search users..."
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default UsersHeader;
