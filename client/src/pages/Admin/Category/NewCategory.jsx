import { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { newCategory } from "../../../redux/Actions/CategoryAction";
import { useNavigate } from "react-router-dom";

const NewCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const createNewCategory = () => {
    const newCate = {
      name: name,
      slug: slug,
    };
    dispatch(newCategory(newCate));
    navigate("/admin/category");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createNewCategory();
  };

  return (
    <Fragment>
      <div className="row mt-5">
        <div className="col-12 col-md-10 mt-5">
          <Fragment>
            <div className="wrapper my-5">
              <h1 className="mb-4">Thêm danh mục mới</h1>

              <form onSubmit={submitHandler} noValidate>
                <div className="form-group">
                  <label htmlFor="firstname_field">Tên danh mục</label>
                  <input
                    type="text"
                    id="firstname_field"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastname_field">Slug danh mục</label>
                  <input
                    type="text"
                    id="lastname_field"
                    className="form-control"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  Thêm danh mục
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default NewCategory;
