# write a function to compile using switch case

# $1 = language
# $2 = file


function compile() {

    case $1 in
        "c")
            gcc $2
            #check if the output status is 0
            if [ $? -eq 0 ]; then
                #if the output status is 0, then run the program
                run $1
            else
                #if the output status is not 0, then print the error message
                return 1
            fi
            ;;
        "cpp")
           g++ $2
            #check if the output status is 0
            if [ $? -eq 0 ]; then
                #if the output status is 0, then run the program
                run $1
            else
                #if the output status is not 0, then print the error message
                return 1
            fi
            ;;
        "java")
            javac $2
            run $1
            ;;
        "py3")
            run $1 $2
            ;;
        "node")
            run $1 $2
            ;;
        *)
            echo "Invalid language"
            ;;
    esac
}

function run() {
    
    case $1 in
        "c")
            ./a.out
            ;;
        "cpp")
            ./a.out
            ;;

        "java")
            java Main
            ;;
        "py3")
            python3 $2
            ;;
        "node")
            node $2
            ;;
        *)
            echo "Invalid language"
            ;;
    esac
}

compile $1 $2