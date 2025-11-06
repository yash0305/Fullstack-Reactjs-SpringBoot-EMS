const Header = ({ totalEmployees }) => {
  return (
    <>
      <div className="flex justify-center mt-5">
        <div className="flex flex-col items-center justify-center h-auto space-y-4 bg-white w-[80%] rounded-xl">
          <div className="p-8 rounded-2xl w-[80%] text-center">
            <h1 className="text-[2.5rem] text-[#2c3e50] mb-2 font-bold">
              Employee Management System
            </h1>

            <div className="bg-gradient-to-tr from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600 text-white px-6 py-3 rounded-full inline-block font-semibold text-lg transition-all duration-300">
              <span>Total Employees: {totalEmployees}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
