import { IMovieList } from "@/Types/Movies/movies.type";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { debounce } from "lodash";
import { getSearchedMovies } from "@/actions/movies";

export const useSearched = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [movieData, setMovieData] = useState<IMovieList>({} as IMovieList);

  const handleSearch = debounce(async (searchTerm: string) => {
    const movieDataList = await getSearchedMovies(`query=${searchTerm}`);
    const params = new URLSearchParams(searchParams);
    params.set("s", `${searchTerm}`);
    setMovieData(movieDataList);
    const queryString = params.toString();
    const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(updatedPath);
  }, 1000);

  const callNextPage = async () => {
    const movieDataList = await getSearchedMovies(
      `query=${searchParams.get("s")}&page=${movieData.page + 1}`
    );
    setMovieData({
      page: movieDataList.page,
      results: [...movieData.results, ...movieDataList.results],
      total_pages: movieDataList.total_pages,
      total_results: movieDataList.total_results,
    });
  };
  return {
    movieData,
    handleSearch,
    callNextPage,
  };
};
