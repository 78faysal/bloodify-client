import useAuth from "../../../Hooks/useAuth";

const Dashboard = () => {
    const {user} = useAuth();
    return (
        <div>
            <h2 className="text-2xl font-bold">Welcome <span className="text-red-500">{user?.displayName}</span></h2>
        </div>
    );
};

export default Dashboard;