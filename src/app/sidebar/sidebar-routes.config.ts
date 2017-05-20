
 interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'home', title: 'Home',  icon: 'home', class: '' },
    { path: 'user', title: 'User Profile',  icon:'person', class: '' }
];
