import { useEffect, useState } from "react";
import {
    getInvestments
} from "../services/investmentService";

export function useInvestments() {

  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInvestments = async () => {

    try {

      setLoading(true);

      const response = await getInvestments();

      setInvestments(
        response.data?.investments || []
      );

    } catch (err) {

      setError(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchInvestments();

  }, []);

  return {

    investments,

    loading,

    error,

    refreshInvestments: fetchInvestments,

    setInvestments

  };

}
