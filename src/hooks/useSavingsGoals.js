import {
  useEffect,
  useState
} from "react";

  import {
  getSavingsGoals
} from "../services/savingsService";

  export const useSavingsGoals =
    () => {
      const [goals, setGoals] =
        useState([]);

      useEffect(() => {
        const fetchGoals =
          async () => {
            try {
              const response =
                await getSavingsGoals();

              setGoals(
                response.data?.goals || []
              );
            } catch (error) {
              console.log(error);
            }
          };

        fetchGoals();
      }, []);

      return {
        goals
      };
    };
