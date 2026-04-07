from pyflink.datastream import StreamExecutionEnvironment


def main():
    env = StreamExecutionEnvironment.get_execution_environment()
    env.set_parallelism(1)

    # Placeholder:
    # Kafka source -> fraud enrichment -> MongoDB/OpenSearch sink
    print("NERP FinTech Flink pipeline initialized")


if __name__ == "__main__":
    main()
