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
              const data =
                await getSavingsGoals();
  
              setGoals(
                data.goals || []
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