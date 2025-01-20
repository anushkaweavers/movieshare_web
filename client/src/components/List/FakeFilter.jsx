import React, { useState } from "react";
import {
  Box,
  Container,
  FormGroup,
  Grid as Grid2,
  InputLabel,
  Popover,
  Slider,
  Typography,
} from "@mui/material";
import DropDownField from "@/Components/Common/UiComps/DropDownField";
import { TMDBConfig } from "../../Utils/config";
import YearPicker from "@/Components/Common/UiComps/YearPicker";
import ButtonField from "@/Components/Common/UiComps/ButtonField";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const Filter = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState([
    searchParams.get("vote_average.gte")
      ? Number(searchParams.get("vote_average.gte")) * 10
      : 0,
    searchParams.get("vote_average.lte")
      ? Number(searchParams.get("vote_average.lte")) * 10
      : 100,
  ]);

  const open = Boolean(anchorEl);

  const handleQuery = (query, queryValue) => {
    searchParams.set("m", "s");
    searchParams.set(query, `${queryValue}`);
    const queryString = searchParams.toString();
    const updatedPath = queryString ? `/movies/filter?${queryString}` : "/movies/filter";
    navigate(updatedPath);
  };

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event) => {
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

  const switchSort = () => {
    const sortBy = searchParams.get("sort_by");
    if (sortBy) {
      if (sortBy.endsWith(".asc")) {
        handleQuery("sort_by", sortBy.replace(/\.asc$/i, ".desc"));
      } else if (sortBy.endsWith(".desc")) {
        handleQuery("sort_by", sortBy.replace(/\.desc$/i, ".asc"));
      }
    }
  };

  const MAX = 100;
  const MIN = 0;
  const marks = [
    { value: MIN, label: "" },
    { value: MAX, label: "" },
  ];

  return (
    <Box className="movie-filter-wraper">
      <Container maxWidth="xl">
        <Grid2 container spacing={2} className="movie-filter-list">
          <Grid2 item lg={9} md={8} sm={12} xs={12} className="filter-browse-by">
            <FormGroup className="input-each">
              <InputLabel className="input-label">Browse by:</InputLabel>

              <Box className="filter-browse-by-list">
                <DropDownField
                  id="genre"
                  name="genre"
                  options={TMDBConfig.genres.map((gen) => ({
                    title: gen.name,
                    value: gen.id,
                  }))}
                  onChange={(e) => handleQuery("with_genres", e.target.value)}
                  error={false}
                  clsDrop="input-select"
                  placeholder="Genre"
                  value={searchParams.get("with_genres") || ""}
                />
                <YearPicker
                  id="date_of_birth"
                  name="date_of_birth"
                  onChange={(newValue) => {
                    handleQuery("primary_release_year", `${newValue.year()}`);
                  }}
                  value={dayjs(searchParams.get("primary_release_year"))}
                />

                <DropDownField
                  id="country"
                  name="country"
                  options={TMDBConfig.countries.map((coun) => ({
                    title: coun.english_name,
                    value: coun.iso_3166_1,
                  }))}
                  onChange={(e) => handleQuery("with_origin_country", e.target.value)}
                  error={false}
                  value={searchParams.get("with_origin_country") || ""}
                  clsDrop="input-select"
                  placeholder="Country"
                />

                <DropDownField
                  id="language"
                  name="language"
                  options={TMDBConfig.lang.map((lang) => ({
                    title: lang.english_name,
                    value: lang.iso_639_1,
                  }))}
                  onChange={(e) => handleQuery("language", e.target.value)}
                  error={false}
                  value={searchParams.get("language") || ""}
                  clsDrop="input-select"
                  placeholder="Language"
                />
                <div
                  className="rating-filter"
                  role="button"
                  tabIndex={0}
                  onClick={handleClick}
                  onKeyDown={handleClick}
                >
                  Rating
                </div>
              </Box>
            </FormGroup>
          </Grid2>

          <Grid2 item lg={3} md={4} sm={12} xs={12} className="filter-sort">
            <Box className="filter-sort-inner">
              <FormGroup className="input-each">
                <InputLabel className="input-label">Sort by:</InputLabel>

                <DropDownField
                  id="sort_by"
                  name="sort_by"
                  options={TMDBConfig.sort_by}
                  onChange={(e) => handleQuery("sort_by", `${e.target.value}.asc`)}
                  error={false}
                  value={
                    searchParams.get("sort_by")
                      ? searchParams.get("sort_by").replace(/\.(asc|desc)$/i, "")
                      : ""
                  }
                  clsDrop="input-select"
                  placeholder="Select"
                />
                <span
                  className="pointer"
                  onClick={switchSort}
                  onKeyDown={switchSort}
                  role="button"
                  tabIndex={0}
                  aria-label="sort"
                >
                  <div className="sort-icon">
                    <SwapVertIcon />
                  </div>
                </span>
              </FormGroup>
            </Box>
          </Grid2>
        </Grid2>
      </Container>

      {/* Rating Popover */}
      <Popover
        className="rating-popup"
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseModal}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <div className="rating-pop-title">
          <p>Select Ratings</p>
          <img width={20} height={19} src="/images/rating-star.svg" alt="Rating Star" />
        </div>
        <Box sx={{ width: 290, px: 2, py: 2 }}>
          <Slider
            getAriaLabel={() => "Rating range"}
            value={value}
            onChange={handleChange}
            valueLabelFormat={(e) => e / 10}
            defaultValue={0}
            step={1}
            valueLabelDisplay="auto"
            marks={marks}
            min={MIN}
            max={MAX}
            className="rating-popup-slider"
          />
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "space-between" }}
          className="rating-label-wrap"
        >
          <Typography>0 stars</Typography>
          <Typography>10 stars</Typography>
        </Box>
        <Box className="rating-btn-wrap">
          <ButtonField mainCls="p-btn border-btn" onClick={handleCloseModal} label="Cancel" />
          <ButtonField mainCls="p-btn" onClick={handleApply} label="Apply" />
        </Box>
      </Popover>
    </Box>
  );
};

export default Filter;
