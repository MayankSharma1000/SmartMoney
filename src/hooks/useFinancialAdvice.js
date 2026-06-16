import { useEffect, useState } from "react";
import { getFinancialAdvice } from "../services/aiService";

export const useFinancialAdvice = () => {
  const [advice, setAdvice] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setAdvice(["Login again to generate AI financial advice."]);
          return;
        }

        const data = await getFinancialAdvice(token);

        setAdvice(data.advice || []);
      } catch (error) {
        console.log(error);
        setAdvice(["Unable to generate AI advice right now."]);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvice();
  }, []);

  return {
    advice,
    loading
  };
};