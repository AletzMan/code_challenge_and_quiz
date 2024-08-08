
import { AWSIcon, AngularIcon, AnsibleIcon, BookIcon, BootstrapIcon, CPPIcon, CSSIcon, CSharpIcon, DartIcon, DjangoIcon, DockerIcon, ExpressIcon, FlaskIcon, GoIcon, HTMLIcon, JSIcon, JavaIcon, JenkinsIcon, KotlinIcon, KubernetesIcon, LaravelIcon, LuaIcon, NetIcon, NextIcon, NextJSIcon, NodeIcon, NuxtIcon, PHPIcon, PerlIcon, PythonIcon, RIcon, ReactIcon, RubyIcon, RubyOnRailsIcon, RustIcon, SQLIcon, ScalaIcon, SpringIcon, SwiftIcon, TSIcon, TailwindIcon, TerraformIcon, VueIcon } from "@/app/components/Icons"
import { IItemCategory } from "../interfaces/languages"



export const CATEGORIES = {
    types: {
        items: [
            {
                option: "languages",
                value: "Lenguajes",
                functionSyntax: `<!--does not support functions -->`,
                color: "#E34F26",
                logo: <NextIcon />,
                language: ""
            },
            {
                option: "frontend",
                value: "Front-End",
                functionSyntax: `<!--does not support functions -->`,
                color: "#E34F26",
                logo: <NextIcon />,
                language: ""
            },
            {
                option: "backend",
                value: "Back-End",
                functionSyntax: `<!--does not support functions -->`,
                color: "#E34F26",
                logo: <NextIcon />,
                language: ""
            },
            {
                option: "devops",
                value: "DevOps",
                functionSyntax: `<!--does not support functions -->`,
                color: "#E34F26",
                logo: <NextIcon />,
                language: ""
            }
        ]
    },
    languages: {
        items: [
            {
                option: "javascript",
                value: "JavaScript",
                language: "javascript",
                functionSyntax: `function myFunction() {\n\treturn false;\n}`,
                color: "#F7DF1E",
                logo: <JSIcon />
            },
            {
                option: "python",
                value: "Python",
                language: "python",
                functionSyntax: `def myFunction():\n\treturn False`,
                color: "#3776AB",
                logo: <PythonIcon />
            },
            {
                option: "java",
                value: "Java",
                language: "java",
                functionSyntax: `public class Main {\n\tpublic static boolean myFunction() {\n\t\treturn false;\n\t}\n}`,
                color: "#007396",
                logo: <JavaIcon />
            },
            {
                option: "cpp",
                value: "C++",
                language: "cpp",
                functionSyntax: `namespace MyNamespace {\n\tbool myFunction() {\n\t\treturn false;\n\t}\n}`,
                color: "#00599C",
                logo: <CPPIcon />
            },
            {
                option: "csharp",
                value: "C#",
                language: "csharp",
                functionSyntax: `namespace MyNamespace {\n\tclass Program {\n\t\tpublic bool myFunction() {\n\t\t\treturn false;\n\t\t}\n\t}\n}`,
                color: "#239120",
                logo: <CSharpIcon />
            },
            {
                option: "ruby",
                value: "Ruby",
                language: "ruby",
                functionSyntax: `module MyModule\n\tdef myFunction\n\t\tfalse\n\tend\nend`,
                color: "#CC342D",
                logo: <RubyIcon />
            },
            {
                option: "php",
                value: "PHP",
                language: "php",
                functionSyntax: `<?php\nfunction myFunction() {\n\treturn false;\n}`,
                color: "#777BB4",
                logo: <PHPIcon />
            },
            {
                option: "typescript",
                value: "TypeScript",
                language: "typescript",
                functionSyntax: `function myFunction(): boolean {\n\treturn false;\n}`,
                color: "#3178C6",
                logo: <TSIcon />
            },
            {
                option: "swift",
                value: "Swift",
                language: "swift",
                functionSyntax: `class MyClass {\n\tfunc myFunction() -> Bool {\n\t\treturn false\n\t}\n}`,
                color: "#FA7343",
                logo: <SwiftIcon />
            },
            {
                option: "kotlin",
                value: "Kotlin",
                language: "kotlin",
                functionSyntax: `class MyClass {\n\tfun myFunction(): Boolean {\n\t\treturn false\n\t}\n}`,
                color: "#0095D5",
                logo: <KotlinIcon />
            },
            {
                option: "go",
                value: "Go",
                language: "go",
                functionSyntax: `package main\n\nfunc myFunction() bool {\n\treturn false\n}`,
                color: "#00ADD8",
                logo: <GoIcon />
            },
            {
                option: "rs",
                value: "Rust",
                language: "rust",
                functionSyntax: `mod my_module {\n\tpub fn myFunction() -> bool {\n\t\tfalse\n\t}\n}`,
                color: "#DEA584",
                logo: <RustIcon />
            },
            {
                option: "dart",
                value: "Dart",
                language: "dart",
                functionSyntax: `class MyClass {\n\tbool myFunction() {\n\t\treturn false;\n\t}\n}`,
                color: "#0175C2",
                logo: <DartIcon />
            },
            {
                option: "scala",
                value: "Scala",
                language: "scala",
                functionSyntax: `object MyObject {\n\tdef myFunction(): Boolean = {\n\t\tfalse\n\t}\n}`,
                color: "#DC322F",
                logo: <ScalaIcon />
            },
            {
                option: "r",
                value: "R",
                language: "r",
                functionSyntax: `myFunction <- function() {\n\treturn(FALSE)\n}`,
                color: "#276DC3",
                logo: <RIcon />
            },
            {
                option: "perl",
                value: "Perl",
                language: "perl",
                functionSyntax: `package MyPackage;\n\nsub myFunction {\n\treturn 0;\n}`,
                color: "#39457E",
                logo: <PerlIcon />
            },
            {
                option: "lua",
                value: "Lua",
                language: "lua",
                functionSyntax: `function myFunction()\n\treturn false\nend`,
                color: "#3737f9",
                logo: <LuaIcon />
            },
            {
                option: "sql",
                value: "SQL",
                language: "sql",
                functionSyntax: `-- SQL does not support functions in the same way\n-- Example for a stored procedure\nCREATE PROCEDURE myFunction()\nAS\nBEGIN\n\tSELECT 0 AS Result;\nEND`,
                color: "#E38C00",
                logo: <SQLIcon />
            }
        ]
    },
    frontend: {
        items: [
            {
                option: "html",
                value: "HTML",
                functionSyntax: `<!-- HTML does not support functions -->`,
                color: "#E34F26",
                logo: <HTMLIcon />,
                language: "html"
            },
            {
                option: "css",
                value: "CSS",
                functionSyntax: `/* CSS does not support functions */`,
                color: "#1572B6",
                logo: <CSSIcon />,
                language: "css"
            },
            {
                option: "reactjs",
                value: "React",
                functionSyntax: `function myFunction() {\n\treturn false;\n}`,
                color: "#61DAFB",
                logo: <ReactIcon />,
                language: "jsx"
            },
            {
                option: "angular",
                value: "Angular",
                functionSyntax: `function myFunction() {\n\treturn false;\n}`,
                color: "#DD0031",
                logo: <AngularIcon />,
                language: "tsx"
            },
            {
                option: "vuejs",
                value: "Vue.js",
                functionSyntax: `function myFunction() {\n\treturn false;\n}`,
                color: "#4FC08D",
                logo: <VueIcon />,
                language: "jsx"
            },
            {
                option: "nextjs",
                value: "Next.js",
                functionSyntax: `function myFunction() {\n\treturn false;\n}`,
                color: "#f4f4f4",
                logo: <NextJSIcon />,
                language: "jsx"
            },
            {
                option: "nuxtjs",
                value: "Nuxt.js",
                functionSyntax: `function myFunction() {\n\treturn false;\n}`,
                color: "#00C58E",
                logo: <NuxtIcon />,
                language: "tsx"
            },
            {
                option: "bootstrap",
                value: "Bootstrap",
                functionSyntax: `/* Bootstrap does not support functions */`,
                color: "#7952B3",
                logo: <BootstrapIcon />,
                language: "css"
            },
            {
                option: "tailwindcss",
                value: "Tailwind CSS",
                functionSyntax: `/* Tailwind CSS does not support functions */`,
                color: "#38B2AC",
                logo: <TailwindIcon />,
                language: "css"
            },
            {
                option: "sass",
                value: "Sass",
                functionSyntax: `/* Sass does not support functions */`,
                color: "#CC6699",
                logo: <CSSIcon />,
                language: "sass"
            }
        ]
    },
    backend: {
        items: [
            {
                option: "nodejs",
                value: "Node.js",
                functionSyntax: `function myFunction() {\n\treturn false;\n}`,
                color: "#339933",
                logo: <NodeIcon />,
                language: "javascript"
            },
            {
                option: "django",
                value: "Django",
                functionSyntax: `def myFunction():\n\treturn False`,
                color: "#0c704a",
                logo: <DjangoIcon />,
                language: "python"
            },
            {
                option: "flask",
                value: "Flask",
                functionSyntax: `def myFunction():\n\treturn False`,
                color: "#000000",
                logo: <FlaskIcon />,
                language: "python"
            },
            {
                option: "expressjs",
                value: "Express.js",
                functionSyntax: `function myFunction() {\n\treturn false;\n}`,
                color: "#000000",
                logo: <ExpressIcon />,
                language: "javascript"
            },
            {
                option: "laravel",
                value: "Laravel",
                functionSyntax: `<?php\nfunction myFunction() {\n\treturn false;\n}`,
                color: "#FF2D20",
                logo: <LaravelIcon />,
                language: "php"
            },
            {
                option: "spring",
                value: "Spring",
                functionSyntax: `public class Main {\n\tpublic static boolean myFunction() {\n\t\treturn false;\n\t}\n}`,
                color: "#6DB33F",
                logo: <SpringIcon />,
                language: ""
            },
            {
                option: "ruby-on-rails",
                value: "Ruby on Rails",
                functionSyntax: `module MyModule\n\tdef myFunction\n\t\tfalse\n\tend\nend`,
                color: "#CC0000",
                logo: <RubyOnRailsIcon />,
                language: "tuby"
            }
        ]
    },
    devops: {
        items: [
            {
                option: "docker",
                value: "Docker",
                functionSyntax: `# Docker does not support functions`,
                color: "#0DB7ED",
                logo: <DockerIcon />,
                language: ""
            },
            {
                option: "kubernetes",
                value: "Kubernetes",
                functionSyntax: `# Kubernetes does not support functions`,
                color: "#326CE5",
                logo: <KubernetesIcon />,
                language: ""
            },
            {
                option: "aws",
                value: "AWS",
                functionSyntax: `# AWS does not support functions`,
                color: "#FF9900",
                logo: <AWSIcon />,
                language: ""
            },
            {
                option: "terraform",
                value: "Terraform",
                functionSyntax: `# Terraform does not support functions`,
                color: "#623CE4",
                logo: <TerraformIcon />,
                language: ""
            },
            {
                option: "jenkins",
                value: "Jenkins",
                functionSyntax: `# Jenkins does not support functions`,
                color: "#D24939",
                logo: <JenkinsIcon />,
                language: ""
            },
            {
                option: "ansible",
                value: "Ansible",
                functionSyntax: `# Ansible does not support functions`,
                color: "#EE0000",
                logo: <AnsibleIcon />,
                language: ""
            }
        ]
    }
}


export const DefaultLanguage: IItemCategory = {
    option: "javascript",
    value: "JavaScript",
    language: "javascript",
    functionSyntax: `function myFunction() {\n\treturn false;\n}`,
    color: "#F7DF1E",
    logo: <JavaIcon />
}

export const DefaultCategory: IItemCategory = {
    option: "languages",
    language: "",
    value: "Lenguajes",
    functionSyntax: `null`,
    color: "#F7DF1E",
    logo: <BookIcon />
}