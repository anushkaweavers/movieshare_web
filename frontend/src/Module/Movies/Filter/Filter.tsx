"use client";

import {
  Box,
  Container,
  FormGroup,
  Grid2,
  InputLabel,
  Popover,
  Slider,
  Typography,
} from "@mui/material";
import React from "react";
import Image from "next/image";
import DropDownField from "@/Components/Common/UiComps/DropDownField";
import { TMDBConfig } from "@/Utils/config";
import YearPicker from "@/Components/Common/UiComps/YearPicker";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import ButtonField from "@/Components/Common/UiComps/ButtonField";

interface IFilter {
  handleQuery: (_query: string, _value: string) => void;
}
const Filter = (props: IFilter) => {
  const { handleQuery } = props;
  const searchparams = useSearchParams();
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const [value, setValue] = React.useState<number[]>([
    searchparams.get("vote_average.gte")
      ? Number(searchparams.get("vote_average.gte")) * 10
      : 0,
    searchparams.get("vote_average.lte")
      ? Number(searchparams.get("vote_average.lte")) * 10
      : 100,
  ]);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  const handleClick = (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseModal = () => {
    setAnchorEl(null);
  };
  const handleApply = () => {
    handleQuery("vote_average.gte", `${value[0] / 10}`);
    handleQuery("vote_average.lte", `${value[1] / 10}`);
    handleCloseModal();
  };
  const swithcSort = () => {
    if (searchparams.get("sort_by")) {
      if (searchparams.get("sort_by")!.endsWith(".asc")) {
        handleQuery(
          "sort_by",
          searchparams.get("sort_by")!.replace(/\.asc$/i, ".desc")
        );
      } else if (searchparams.get("sort_by")!.endsWith(".desc")) {
        handleQuery(
          "sort_by",
          searchparams.get("sort_by")!.replace(/\.desc$/i, ".asc")
        );
      }
    }
  };
  const MAX = 100;
  const MIN = 0;
  const marks = [
    {
      value: MIN,
      label: "",
    },
    {
      value: MAX,
      label: "",
    },
  ];
  return (
    <Box className='movie-filter-wraper'>
      <Container maxWidth='xl'>
        <Grid2 container spacing={2} className='movie-filter-list'>
          <Grid2
            size={{ lg: 9, md: 8, sm: 12, xs: 12 }}
            className='filter-browse-by'
          >
            <FormGroup className='input-each'>
              <InputLabel className='input-label'>Browse by:</InputLabel>

              <Box className='filter-browse-by-list'>
                <DropDownField
                  id='genre'
                  name='genre'
                  options={TMDBConfig.genres.map((gen) => {
                    return { title: gen.name, value: gen.id };
                  })}
                  onChange={(e) => handleQuery("with_genres", e.target.value)}
                  error={false}
                  clsDrop='input-select'
                  placeholder='Genre'
                  value={searchparams.get("with_genres") ?? ""}
                />
                <YearPicker
                  id='date_of_birth'
                  name='date_of_birth'
                  onChange={(newValue) => {
                    handleQuery("primary_release_year", `${newValue!.year()}`);
                  }}
                  value={dayjs(searchparams.get("primary_release_year"))}
                  //   label='Birthday'
                />

                <DropDownField
                  id='country'
                  name='country'
                  options={TMDBConfig.countries.map((coun) => {
                    return {
                      title: coun.english_name,
                      value: coun.iso_3166_1,
                    };
                  })}
                  onChange={(e) =>
                    handleQuery("with_origin_country", e.target.value)
                  }
                  error={false}
                  value={searchparams.get("with_origin_country") ?? ""}
                  clsDrop='input-select'
                  placeholder='Country'
                />

                <DropDownField
                  id='language'
                  name='language'
                  options={TMDBConfig.lang.map((lang) => {
                    return {
                      title: lang.english_name,
                      value: lang.iso_639_1,
                    };
                  })}
                  onChange={(e) => handleQuery("language", e.target.value)}
                  error={false}
                  value={searchparams.get("language") ?? ""}
                  clsDrop='input-select'
                  placeholder='Language'
                />
                <div
                  className='rating-filter'
                  role='button'
                  tabIndex={0}
                  onKeyUp={(e) => handleClick(e)}
                  onClick={(e) => handleClick(e)}
                >
                  Rating
                </div>
              </Box>
            </FormGroup>
          </Grid2>

          <Grid2
            size={{ lg: 3, md: 4, sm: 12, xs: 12 }}
            className='filter-sort'
          >
            <Box className='filter-sort-inner'>
              <FormGroup className='input-each'>
                <InputLabel className='input-label'>Sort by:</InputLabel>

                <DropDownField
                  id='sort_by'
                  name='sort_by'
                  options={TMDBConfig.sort_by}
                  onChange={(e) =>
                    handleQuery("sort_by", `${e.target.value}.asc`)
                  }
                  error={false}
                  value={
                    searchparams.get("sort_by")
                      ? searchparams
                          .get("sort_by")!
                          .replace(/\.(asc|desc)$/i, "")
                      : ""
                  }
                  clsDrop='input-select'
                  placeholder='Select'
                />
                <span
                  className='pointer'
                  onClick={swithcSort}
                  onKeyUp={swithcSort}
                  role='button'
                  tabIndex={0}
                  aria-label='sort'
                >
                  <Image
                    width={17}
                    height={18}
                    src='/images/sort-icon.svg'
                    alt=''
                  />
                </span>
              </FormGroup>
            </Box>
          </Grid2>
        </Grid2>
      </Container>
      {/* Rating Popover */}
      <Popover
        className='rating-popup'
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseModal}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className='rating-pop-title'>
          <p>Select Ratings</p>
          <Image width={20} height={19} src='/images/rating-star.svg' alt='' />
        </div>
        {/* <Box sx={{ width: 300, px: 2, py: 2 }}>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay='auto'
            //valueLabelFormat={(e) => e / 10}
            marks={marks}
          />
          <ButtonField mainCls='' onClick={handleApply} label='Apply' />
        </Box> */}

        <Box sx={{ width: 290, px: 2, py: 2 }}>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={value}
            onChange={handleChange}
            valueLabelFormat={(e) => e / 10}
            defaultValue={0}
            step={1}
            valueLabelDisplay='auto'
            marks={marks}
            min={MIN}
            max={MAX}
            className='rating-popup-slider'
          />
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "space-between" }}
          className='rating-label-wrap'
        >
          <Typography>0 stars</Typography>
          <Typography>10 stars</Typography>
        </Box>
        <Box className='rating-btn-wrap'>
          <ButtonField
            mainCls='p-btn border-btn'
            onClick={handleCloseModal}
            label='Cancel'
          />
          <ButtonField mainCls='p-btn' onClick={handleApply} label='Apply' />
        </Box>
      </Popover>
    </Box>
  );
};

export default Filter;
