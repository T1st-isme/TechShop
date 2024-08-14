import {
    Bars3Icon,
    ShoppingBagIcon,
    XMarkIcon as XMarkIconOutline,
} from "@heroicons/react/24/outline";
import { Dialog, Menu, Popover, Tab, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Search from "../Layout/Search";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../redux/Actions/CategoryAction";
import { logout } from "../../redux/Actions/UserAction";
import { Link, useNavigate } from "react-router-dom";
import { listProduct } from "../../redux/Actions/ProductAction";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Header = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const cart = useSelector((state) => state.cart);
    const categoryList = useSelector((state) => state.categoryList || []);

    const handleLinkClick = (category) => {
        dispatch(listProduct({ category: category })).then(() => {
            navigate(`/product-category/${category}`);
        });
    };

    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch]);

    const logoutHandler = () => {
        const rs = dispatch(logout());
        if (rs) {
            navigate("/login");
        }
    };

    useEffect(() => {
        console.log("Category List:", categoryList);
        categoryList.categoryList.map((item) => {
            console.log("Category Item map:", item.name);
        });
    }, [categoryList]);

    let totalItemsInCart = 0;
    if (cart.cartItems) {
        totalItemsInCart = Object.values(cart.cartItems).length;
    }

    return (
        <div
            className="top-0 z-100 bg-white"
            style={{ position: "fixed", width: "100%", zIndex: 2 }}
        >
            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-40 lg:hidden"
                    onClose={setOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                <div className="flex px-4 pt-5 pb-2">
                                    <button
                                        type="button"
                                        className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">
                                            Close menu
                                        </span>
                                        <XMarkIconOutline
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>

                                {/* Links */}
                                <Tab.Group as="div" className="mt-2">
                                    <div className="border-b border-gray-200">
                                        <Tab.List className="-mb-px flex space-x-8 px-4">
                                            {/* {navigation.categories.map((category) => (
                                                <Tab
                                                    key={category.name}
                                                    className={({ selected }) =>
                                                        classNames(
                                                            selected
                                                                ? "text-indigo-600 border-indigo-600"
                                                                : "text-gray-900 border-transparent",
                                                            "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"
                                                        )
                                                    }
                                                >
                                                    {category.name}
                                                </Tab>
                                            ))} */}
                                        </Tab.List>
                                    </div>
                                    <Tab.Panels as={Fragment}>
                                        {/* {navigation.categories.map((category) => (
                                            <Tab.Panel
                                                key={category.name}
                                                className="space-y-10 px-4 pt-10 pb-8"
                                            >
                                                <div className="grid grid-cols-2 gap-x-4">
                                                    {category.featured.map((item) => (
                                                        <div
                                                            key={item.name}
                                                            className="group relative text-sm"
                                                        >
                                                            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                <img
                                                                    src={item.imageSrc}
                                                                    alt={item.imageAlt}
                                                                    className="object-cover object-center"
                                                                />
                                                            </div>
                                                            <a
                                                                href={item.href}
                                                                className="mt-6 block font-medium text-gray-900"
                                                            >
                                                                <span
                                                                    className="absolute inset-0 z-10"
                                                                    aria-hidden="true"
                                                                />
                                                                {item.name}
                                                            </a>
                                                            <p aria-hidden="true" className="mt-1">
                                                                Shop now
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                                {category.sections.map((section) => (
                                                    <div key={section.name}>
                                                        <p
                                                            id={`${category.id}-${section.id}-heading-mobile`}
                                                            className="font-medium text-gray-900"
                                                        >
                                                            {section.name}
                                                        </p>
                                                        <ul
                                                            aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                                            className="mt-6 flex flex-col space-y-6"
                                                        >
                                                            {section.items.map((item) => (
                                                                <li key={item.name} className="flow-root">
                                                                    <a
                                                                        href={item.href}
                                                                        className="-m-2 block p-2 text-gray-500"
                                                                    >
                                                                        {item.name}
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </Tab.Panel>
                                        ))} */}
                                    </Tab.Panels>
                                </Tab.Group>

                                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                                    {/* {navigation.pages.map((page) => (
                                        <div key={page.name} className="flow-root">
                                            <a
                                                href={page.href}
                                                className="-m-2 block p-2 font-medium text-gray-900"
                                            >
                                                {page.name}
                                            </a>
                                        </div>
                                    ))} */}
                                </div>

                                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                                    <div className="flow-root">
                                        <a
                                            href="#"
                                            className="-m-2 block p-2 font-medium text-gray-900"
                                        >
                                            Đăng nhập
                                        </a>
                                    </div>
                                    <div className="flow-root">
                                        <a
                                            href="#"
                                            className="-m-2 block p-2 font-medium text-gray-900"
                                        >
                                            Đăng ký
                                        </a>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <header className="relative bg-white">
                <nav
                    aria-label="Top"
                    className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
                >
                    <div className="border-b border-gray-200">
                        <div className="flex h-16 items-center">
                            <button
                                type="button"
                                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                                onClick={() => setOpen(true)}
                            >
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </button>

                            {/* Logo */}
                            <div className="ml-4 flex lg:ml-0">
                                <a href="/">
                                    <span className="sr-only">TechShop</span>
                                    <img
                                        className="h-16 w-auto"
                                        src="../../../Logo/LogoTechShop4-removebg.png"
                                        alt=""
                                    />
                                </a>
                            </div>

                            {/* Flyout menus */}
                            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                                <div className="flex h-full space-x-8">
                                    <Popover className="flex">
                                        <div className="relative flex">
                                            <Link
                                                to="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    dispatch(
                                                        listProduct()
                                                    ).then(() => {
                                                        navigate(`/Products`);
                                                    });
                                                }}
                                                className={
                                                    "border-transparent text-gray-700 hover:border-indigo-600 text-indigo-600 hover:text-gray-800 relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                                                }
                                            >
                                                Tất cả
                                            </Link>
                                        </div>
                                    </Popover>
                                </div>
                            </Popover.Group>
                            {categoryList.categoryList.map((item) => (
                                <Popover.Group
                                    className="hidden lg:ml-8 lg:block lg:self-stretch"
                                    key={item._id}
                                >
                                    <div className="flex h-full space-x-8">
                                        <Popover className="flex">
                                            <div className="relative flex">
                                                <Link
                                                    to="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleLinkClick(
                                                            item._id
                                                        );
                                                    }}
                                                    className={
                                                        "border-transparent text-gray-700 hover:border-indigo-600 text-indigo-600 hover:text-gray-800 relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                                                    }
                                                >
                                                    {item.name}
                                                </Link>
                                            </div>
                                        </Popover>
                                    </div>
                                </Popover.Group>
                            ))}
                            {/* Search */}
                            <div className="pr-35">
                                <Search />
                            </div>
                            <div className="ml-6 flex items-center">
                                <div className="ml-auto flex items-center">
                                    {/* Display name when logged in */}
                                    {auth.isAuthenticated && (
                                        <>
                                            {/* Profile dropdown */}
                                            <Menu
                                                as="div"
                                                className="relative ml-4 flex-shrink-0"
                                            >
                                                <div>
                                                    <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                        <span className="sr-only">
                                                            Open user menu
                                                        </span>
                                                        <div className="text-sm font-medium text-gray-700">
                                                            {
                                                                auth.user.user
                                                                    .firstname
                                                            }{" "}
                                                            {
                                                                auth.user.user
                                                                    .lastname
                                                            }
                                                        </div>
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <a
                                                                    href="/Profile"
                                                                    className={classNames(
                                                                        active
                                                                            ? "bg-gray-100"
                                                                            : "",
                                                                        "block px-4 py-2 text-sm text-gray-700"
                                                                    )}
                                                                >
                                                                    Cá nhân
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <a
                                                                    href="/order/me"
                                                                    className={classNames(
                                                                        active
                                                                            ? "bg-gray-100"
                                                                            : "",
                                                                        "block px-4 py-2 text-sm text-gray-700"
                                                                    )}
                                                                >
                                                                    Đơn hàng
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    to="/"
                                                                    onClick={
                                                                        logoutHandler
                                                                    }
                                                                    className={classNames(
                                                                        active
                                                                            ? "bg-gray-100"
                                                                            : "",
                                                                        "block px-4 py-2 text-sm text-gray-700"
                                                                    )}
                                                                >
                                                                    Đăng xuất
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </>
                                    )}

                                    {/* Hide login button when logged in */}
                                    {!auth.isAuthenticated && (
                                        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                            <a
                                                href="/login"
                                                className="text-sm font-medium text-gray-700 hover:text-gray-800"
                                            >
                                                Đăng nhập
                                            </a>
                                            <span
                                                className="h-6 w-px bg-gray-200"
                                                aria-hidden="true"
                                            />
                                            <a
                                                href="/signup"
                                                className="text-sm font-medium text-gray-700 hover:text-gray-800"
                                            >
                                                Đăng ký
                                            </a>
                                        </div>
                                    )}

                                    {/* Cart */}
                                    <div className="ml-4 flow-root lg:ml-6">
                                        <div
                                            type="button"
                                            name="GioHang"
                                            id="CartBtn"
                                            className="group -m-2 flex items-center p-2"
                                            onClick={() => {
                                                navigate("/Cart");
                                            }}
                                            tabIndex="0"
                                        >
                                            <ShoppingBagIcon
                                                className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />

                                            <div
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    backgroundColor: "red",
                                                    color: "white",
                                                    borderRadius: "50%",
                                                    width: "25px",
                                                    height: "25px",
                                                }}
                                            >
                                                <span className="text-sm font-medium group-hover:text-gray-800">
                                                    {totalItemsInCart}
                                                </span>
                                            </div>
                                            <span className="sr-only">
                                                items in cart, view bag
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Header;
