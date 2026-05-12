import fs from 'fs';
const path = 'src/App.tsx';
let content = fs.readFileSync(path, 'utf8');
const search = "'Đăng nhập ngay' : 'Đăng k";
// We search for a reliable prefix and then skip until Dashboard
const index = content.indexOf(search);
if (index !== -1) {
    const endOfMangle = content.indexOf('const Dashboard = () => {', index);
    if (endOfMangle !== -1) {
        const replacement = "'Đăng nhập ngay' : 'Đăng ký miễn phí'}\n          </button>\n        </p>\n      </motion.div>\n    </div>\n  );\n};\n\nconst Dashboard = () => {";
        const newContent = content.substring(0, index) + replacement + content.substring(endOfMangle + 'const Dashboard = () => {'.length);
        fs.writeFileSync(path, newContent);
        console.log('Fixed!');
    } else {
        console.log('Dashboard not found');
    }
} else {
    console.log('Search string not found');
}
