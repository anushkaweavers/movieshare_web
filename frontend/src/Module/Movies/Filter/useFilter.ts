import { getSearchedMoviesWithFilters } from "@/actions/movies";
import { IMovieList } from "@/Types/Movies/movies.type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const useFitler = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const [movieData, setMovieData] = useState<IMovieList>({} as IMovieList);

  const handleQuery = (query: string, value: string | number) => {
    params.set("m", "s");
    params.set(query, `${value}`);
    const queryString = params.toString();
    const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(updatedPath);
  };
  // Get Movie List
  const getFilteredMovieList = async () => {
    const movieList = await getSearchedMoviesWithFilters(
      window.location.search
    );
    setMovieData(movieList);
  };
  const callNextPage = async () => {
    const movieDataList = await getSearchedMoviesWithFilters(
      `${window.location.search}&page=${movieData.page + 1}`
    );
    setMovieData({
      page: movieDataList.page,
      results: [...movieData.results, ...movieDataList.results],
      total_pages: movieDataList.total_pages,
      total_results: movieDataList.total_results,
    });
  };

  return {
    handleQuery,
    getFilteredMovieList,
    movieData,
    callNextPage,
  };
};
